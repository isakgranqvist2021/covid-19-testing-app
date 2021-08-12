/*
    Current DAY total (RDT VS PCR)
    7 days total (RDT VS PCR)
    Current Month Total (RDT VS PCR)

    Current Month data by entities (Entity A Vs Entity B Vs Entity C vs etc.)
    Current month data by employment status. (Employee vs vendors/Guests)
*/

import { findAll } from "../../models/test";

function constructTypeData(rawData) {
    return {
        pcr: rawData.filter((test) => test.type === "PCR"),
        rdt: rawData.filter((test) => test.type === "RDT"),
    };
}

function constructEntitiesData(rawData) {
    let keys = [];
    let data = {};

    rawData.forEach((test, i) => {
        if (!keys.includes(test.entity)) {
            keys.push(test.entity);
            data[test.entity] = [test];
        } else {
            data[test.entity].push(test);
        }
    });

    return data;
}

function constructStatusData(rawData) {
    return {
        positive: rawData.filter((test) => test.status === "positive"),
        negative: rawData.filter((test) => test.status === "negative"),
        pending: rawData.filter((test) => test.status === "pending"),
    };
}

function constructEmpStatusData(rawData) {
    return {};
}

export default async function graph_data(req, res) {
    const tests = await findAll();

    return res.json({
        message: "",
        success: true,
        data: {
            typeData: constructTypeData(tests),
            entData: constructEntitiesData(tests),
            statusData: constructStatusData(tests),
            empData: constructEmpStatusData(tests),
        },
    });
}
