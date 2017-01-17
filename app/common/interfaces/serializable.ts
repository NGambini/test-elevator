// Interface for serializable models: deserialize input to typed object
export interface Serializable<T> {
    deserialize(input: Object): T;
}