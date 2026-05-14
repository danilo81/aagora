/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { EditorState, LexicalEditor, SerializedEditorState } from "lexical"

export interface SerializedDocument {
  editorState: SerializedEditorState
  source: string
  version: number
}

export function editorStateFromSerializedDocument(
  editor: LexicalEditor,
  serializedDocument: SerializedDocument
): EditorState {
  return editor.parseEditorState(serializedDocument.editorState)
}

export function serializedDocumentFromEditorState(
  editorState: EditorState,
  { source }: { source: string }
): SerializedDocument {
  return {
    editorState: editorState.toJSON(),
    source,
    version: 1,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function* generateReader<T = any>(
  reader: ReadableStreamDefaultReader<T>
) {
  let done = false
  while (!done) {
    const res = await reader.read()
    const { value } = res
    if (value !== undefined) {
      yield value
    }
    done = res.done
  }
}

async function readBytestoString(
  reader: ReadableStreamDefaultReader
): Promise<string> {
  const output = []
  const chunkSize = 0x8000
  for await (const value of generateReader(reader)) {
    for (let i = 0; i < value.length; i += chunkSize) {
      output.push(String.fromCharCode(...value.subarray(i, i + chunkSize)))
    }
  }
  return output.join("")
}

export async function docToHash(doc: SerializedDocument): Promise<string> {
  const cs = new CompressionStream("gzip")
  const writer = cs.writable.getWriter()
  const [, output] = await Promise.all([
    writer
      .write(new TextEncoder().encode(JSON.stringify(doc)))
      .then(() => writer.close()),
    readBytestoString(cs.readable.getReader()),
  ])
  return `#doc=${btoa(output)
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=+$/, "")}`
}

export async function docFromHash(
  hash: string
): Promise<SerializedDocument | null> {
  const m = /^#doc=(.*)$/.exec(hash)
  if (!m) {
    return null
  }
  const ds = new DecompressionStream("gzip")
  const writer = ds.writable.getWriter()
  const b64 = atob((m[1] ?? '').replace(/_/g, "/").replace(/-/g, "+"))
  const array = new Uint8Array(b64.length)
  for (let i = 0; i < b64.length; i++) {
    array[i] = b64.charCodeAt(i)
  }
  const closed = writer.write(array).then(() => writer.close())
  const output = []
  for await (const chunk of generateReader(
    ds.readable.pipeThrough(new TextDecoderStream()).getReader()
  )) {
    output.push(chunk)
  }
  await closed
  return JSON.parse(output.join(""))
}

export function exportFile(
  editor: LexicalEditor,
  config: { fileName?: string; source: string } = { source: "Playground" }
) {
  const now = new Date()
  const serializedDocument = serializedDocumentFromEditorState(
    editor.getEditorState(),
    { source: config.source }
  )
  const fileName = config.fileName || `Playground ${now.toISOString()}`
  const blob = new Blob([JSON.stringify(serializedDocument)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${fileName}.lexical`
  a.click()
  URL.revokeObjectURL(url)
}

export function importFile(editor: LexicalEditor) {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = ".lexical"
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const text = await file.text()
      try {
        const serializedDocument = JSON.parse(text) as SerializedDocument
        editor.setEditorState(
          editorStateFromSerializedDocument(editor, serializedDocument)
        )
      } catch (error) {
        console.error("Failed to import file:", error)
      }
    }
  }
  input.click()
}
