import { join } from "node:path";

interface AlgorythmGeneratorConfig {
    path: string;
}
export class AlgorythmGenerator {
    path: string;

    constructor({ path }: AlgorythmGeneratorConfig) {
        this.path = path;
    }

    async create_class(name: string, item: ClassStructure) {
        const classGen = `export default class ${name}${item.generic || ""} {
    ${(item.properties || []).map(this.generate_property).join("")}
    ${this.generate_constructor(item.args)}
    ${(item.getters || []).map(this.generate_getter).join("")}
    ${(item.methods || []).map(this.generate_method).join("")}
}
        `;

        const classGenWithDescription = this.add_description(
            classGen,
            item.description,
        );
        await Bun.write(join(this.path, `${name}.ts`), classGenWithDescription);
    }

    async create_function(name: string, item: FunctionStructure) {
        const g = item.generic ? item.generic : "";
        const funcitonGen = `export default function ${item.fn}${g}(${item.args}): ${item.return} {
    throw new Error("Not implemented");
}
        `;

        const funcitonGenWithDescription = this.add_description(
            funcitonGen,
            item.description,
        );

        await Bun.write(
            join(this.path, `${name}.ts`),
            funcitonGenWithDescription,
        );
    }

    private add_description(file: string, description: string | undefined) {
        let fileWithDescription = file;
        if (description) {
            fileWithDescription = description + "\n" + file;
        }
        return fileWithDescription;
    }

    private generate_constructor(args: string | undefined) {
        return `
    constructor(${args ?? ""}) {
        throw new Error("Not implemented");
    }
        `;
    }

    private generate_method(method: ClassMethod) {
        return `
    ${method.name}(${method.args || ""}): ${method.return || "void"} {
        throw new Error("Not implemented");
    }
        `;
    }

    private generate_property(prop: ClassProperty) {
        return `${prop.scope} ${prop.name}: ${prop.type};`;
    }

    private generate_getter(getter: ClassGetter) {
        return `
    ${getter.scope} get ${getter.name}(): ${getter.type} {
        throw new Error("Not implemented");
    }
        `;
    }
}

export interface ClassProperty {
    name: string;
    type: string;
    scope: string;
}
export interface ClassMethod {
    name: string;
    args?: string;
    return: string;
}
export interface ClassGetter extends ClassProperty {}

export type AlgorythmStructure = ClassStructure | FunctionStructure;

export interface ClassStructure {
    generic?: string;
    type: "class";
    args?: string;
    methods: ClassMethod[];
    properties?: ClassProperty[];
    getters?: ClassGetter[];
    description: string;
}
export interface FunctionStructure {
    generic?: string;
    type: "fn";
    fn: string;
    args: string;
    return: string;
    description: string;
}
