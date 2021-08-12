import fetch from "node-fetch";
import faker from "faker";

let entities = [
    "Coronation merchants bank",
    "Coronation asset management",
    "Coronation securities",
    "Coronation trustees",
    "Coronation capital",
    "Coronation registrars",
    "Coronation insurance",
    "Coronation X",
    "Truim",
    "GPS",
    "Tengen Family Office",
];

let deps = [
    "Facilities Mgt",
    "Centralized operations",
    "HR",
    "Marketing & Communication",
    "Compliance",
    "Internal control",
    "Internal audit",
    "Risk Mgt",
    "Private banking",
    "Investment banking",
    "Corporate banking",
    "Legal",
    "Office of the MD",
    "Office of the ED",
    "GLOBAL TRADE",
    "Treasury",
    "Information technology",
];

export function testData(includeEmail) {
    let types = ["RDT", "PCR"];
    let t = types[Math.floor(Math.random() * types.length)];
    let genders = ["male", "female"];
    let gender = genders[Math.floor(Math.random() * genders.length)];
    let d = faker.date.past();

    let data = {
        gender: gender,
        type: t,
        name: `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`,
        dd: d.getDay() < 10 ? `0${d.getDay()}` : d.getDay(),
        mm: d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth(),
        yyyy: d.getFullYear(),
        phone: faker.phone.phoneNumber(),
        department: deps[Math.floor(Math.random() * deps.length)],
        entity: entities[Math.floor(Math.random() * entities.length)],
        employee: faker.company.catchPhrase(),
    };

    if (includeEmail) {
        data["email"] = faker.internet.email();
    }

    return data;
}
