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
  name: string;
  value: null | any;
  onValueChange: () => void;
  target: string;
  parent?: null | { id: number };
  depth?: number;
}

const CategorizerInput: React.FC<CategorizerInputProps> = ({
  value,
  onValueChange,
  target,
  parent = null,
  depth = 0,
  ...props
}) => {
  const { post } = useFetchClient();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<undefined | CategorizerValue[]>();

  const currentValue = value[depth] || null;

  const fetch = useCallback(async () => {
    setLoading(true);
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
    if (target) {
      fetch();
    }
  }, [parent]);

  return (
    <>
      <GridItem col={4} s={12}>
        <Select value={currentValue} disabled={false} onChange={() => {}}>
          {options?.map((option) => (
            <Option>{option.id}</Option>
          ))}
        </Select>
      </GridItem>
      {depth < 4 && (
        <CategorizerInput
          name=""
          value={value}
          onValueChange={onValueChange}
          target={target}
          parent={currentValue}
          depth={depth + 1}
        />
      )}
    </>
  );
};

export default CategorizerInput;
