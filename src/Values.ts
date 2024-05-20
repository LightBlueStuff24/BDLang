export type ValueTypes = "null" | "number" | "boolean"

export interface RuntimeVal {
    type: ValueTypes
}

export interface NullVal extends RuntimeVal {
    type: "null",
    value: "null"
}

export function MAKE_NULL() {
    return { type: "null", value: null } as NullVal;
}

export interface NumberVal extends RuntimeVal {
    type: "number",
    value: number
}

export function MAKE_NUM(n = 0) {
    return { type: "number", value: n } as NumberVal;
}

export interface BooleanVal extends RuntimeVal {
    type: "boolean",
    value: boolean
}

export function MAKE_BOOL(b = true) {
    return { type: "boolean", value: b } as BooleanVal;
}