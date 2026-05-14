import { ProjectConfig, Supply } from "../types/types";
import { getTypologyGroup } from "./utils";

interface APUSupplyItem {
    quantity: number;
    price?: number;
    typology?: string;
    supply?: Partial<Supply>;
}

export const calculateAPU = (supplies: APUSupplyItem[], config: ProjectConfig | null, performance: number = 1) => {
    const perf = performance > 0 ? performance : 1;

    if (!config) {
        return {
            totalUnit: 0,
            matSub: 0,
            labSub: 0,
            cSociales: 0,
            ivaMO: 0,
            equSub: 0,
            toolWear: 0,
            directCost: 0,
            adm: 0,
            utility: 0,
            it: 0
        };
    }

    const matSub = supplies.filter((s) => {
        const typo = s.supply?.typology || s.typology || '';
        return getTypologyGroup(typo) === 'mat';
    }).reduce((acc: number, s) => acc + (s.quantity * (s.supply?.price || s.price || 0)), 0);

    const labSubBase = supplies.filter((s) => {
        const typo = s.supply?.typology || s.typology || '';
        return getTypologyGroup(typo) === 'lab';
    }).reduce((acc: number, s) => acc + (s.quantity * (s.supply?.price || s.price || 0)), 0);

    const equSubBase = supplies.filter((s) => {
        const typo = s.supply?.typology || s.typology || '';
        return getTypologyGroup(typo) === 'equ';
    }).reduce((acc: number, s) => acc + (s.quantity * (s.supply?.price || s.price || 0)), 0);

    const labSub = labSubBase / perf;
    const equSub = equSubBase / perf;

    const cSociales = labSub * (Number(config.socialCharges || 0) / 100);
    const ivaMO = (labSub + cSociales) * (Number(config.iva || 0) / 100);
    const toolWear = labSub * (Number(config.toolWear || 0) / 100);

    const directCost = matSub + labSub + equSub + toolWear + cSociales + ivaMO;

    const adm = directCost * (Number(config.adminExpenses || 0) / 100);
    const utility = (directCost + adm) * (Number(config.utility || 0) / 100);
    const it = (directCost + adm + utility) * (Number(config.it || 0) / 100);

    const totalUnit = directCost + adm + utility + it;

    return {
        matSub,
        labSub,
        cSociales,
        ivaMO,
        equSub,
        toolWear,
        directCost,
        adm,
        utility,
        it,
        totalUnit
    };
};