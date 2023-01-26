import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useFetchClient } from "@strapi/helper-plugin";
import {
    Flex,
    Stack,
    Field,
    FieldLabel,
    Select,
    Option,
    Box,
    Loader,
} from "@strapi/design-system";

type Category = {
    id: number;
    slug: string;
    title: string;
    order: number;
    parent: null | number;
};

const inputs = Array.from({ length: 3 }, (_, i) => i);
const CategorizerInput: React.FC<{
    name: string;
    onChange: (
        {
            target: { name, value, type },
        }: { target: { name: string; value: any; type: string } },
        shouldSetInitialValue?: boolean
    ) => void;
    value: null | string;
    attribute: {
        type: string;
        customFiled: string;
    };
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
}> = ({ attribute, name, value: initialValue, intlLabel, onChange }) => {
    const { get } = useFetchClient();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const value: number[] | null = initialValue ? JSON.parse(initialValue) : [];

    const options = useMemo(
        () =>
            inputs.reduce<Category[][]>(
                (acc, i) => [
                    ...acc,
                    value || !value && i < 1 ? categories.filter(({ parent }) =>
                        i === 0 ? parent === null : parent === value![i - 1]
                    ) : []
                ],
                []
            ),
        [categories, value]
    );

    const handleOptionChange = (i: number, id: number) =>
        onChange({
            target: {
                name,
                value: JSON.stringify(value ? [...value.slice(0, i), id] : [id]),
                type: attribute.type,
            },
        });

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        const res = await get("/categorizer");
        if (res.status >= 400) {
            throw new Error("Server responds with error!");
        }
        setCategories(res.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    // console.log("categories", categories);
    // console.log("options", options);
    // console.log("value", value);

    return (
        <Field name={name}>
            <Stack spacing={1}>
                <FieldLabel>{name}</FieldLabel>
                {loading ? (
                    <Loader small>
                        <></>
                    </Loader>
                ) : (
                    <Flex gap={1}>
                        {inputs.map((i) => (
                            <Box flex="1" key={`categorizer-select-${i}`}>
                                <Select
                                    value={
                                        value && value[i]
                                            ? categories.find(({ id }) => id === value[i])?.id
                                            : undefined
                                    }
                                    disabled={options[i]?.length === 0}
                                    onChange={(id) => handleOptionChange(i, id)}
                                >
                                    {options[i] &&
                                        options[i]?.map((option) => (
                                            <Option key={option.id} value={option.id}>
                                                {option.title}
                                            </Option>
                                        ))}
                                </Select>
                            </Box>
                        ))}
                    </Flex>
                )}
            </Stack>
        </Field>
    );
};

export default CategorizerInput;
