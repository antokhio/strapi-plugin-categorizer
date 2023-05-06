import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  useFetchClient,
  useCMEditViewDataManager,
} from "@strapi/helper-plugin";
import {
  Flex,
  Stack,
  Field,
  FieldLabel,
  GridItem,
  Select,
  Option,
  Box,
  Loader,
} from "@strapi/design-system";
import qs from "qs";
import { CategorizerValue } from "../../types";
import { fetcher } from "../../utils/fetcher";

interface CategorizerInputProps {
  value: null | any;
  onValueChange: (args: { value: CategorizerValue; depth: number }) => void;
  target: string | null;
  attribute: string | null;
  parent?: null | { id: number };
  depth?: number;
  maxDepth: number | null;
}

const CategorizerInput: React.FC<CategorizerInputProps> = ({
  value,
  onValueChange,
  target,
  attribute = "id",
  parent,
  depth = 0,
  maxDepth = 3,
  ...props
}) => {
  const { post } = useFetchClient();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<undefined | CategorizerValue[]>();

  const currentValue =
    value && value.length > depth ? value[depth]?.id ?? null : null;

  const fetch = useCallback(async () => {
    setLoading(true);
    console.log({
      target,
      parent,
    });
    try {
      const { data } = await post(`/categorizer`, {
        data: {
          target,
          parent,
        },
      });
      setOptions(data);
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [target, parent]);

  useEffect(() => {
    if (typeof parent !== undefined) {
      fetch();
    }
  }, [parent]);

  const handleOptionChange = (id: number) => {
    let option = options?.find((option) => option.id === id);
    if (option) {
      onValueChange({ value: option, depth });
    }
  };

  return (
    <GridItem col={4} s={12}>
      {loading ? (
        <div>loading</div>
      ) : (
        <Select
          value={currentValue}
          onChange={handleOptionChange}
          loading={loading}
          disabled={Boolean(!options)}
        >
          {options?.map((option) => (
            <Option value={option.id}>
              {option[attribute as keyof typeof option] ?? option.id}
            </Option>
          ))}
        </Select>
      )}
    </GridItem>
  );
};

export default CategorizerInput;
