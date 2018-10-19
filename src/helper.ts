import { RecordType } from './model';

export const getRecordName = (record: RecordType): string => {
    const { name, namespace } = record;
    return (namespace ? `'${namespace}.${name}'` : name);
};

export const capitalizeString = (string: string): string => {
    return 	string.replace(/^./, string[0].toUpperCase());
};


