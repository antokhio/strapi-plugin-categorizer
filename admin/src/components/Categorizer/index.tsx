import { Field, FieldLabel, Grid, Stack } from "@strapi/design-system";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import React, { useMemo } from "react";
import { CategorizerValue } from "../../types";
import CategorizerInput from "../CategorizerInput";

interface CategorizerProps {
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
    options: {
      target: string | null;
      targetAttribute: string | null;
      maxDepth: number | null;
    };
  };
  intlLabel: {
    id: string;
    defaultMessage: string;
  };
}

const Categorizer: React.FC<CategorizerProps> = ({
  name,
  attribute: {
    options: { target: targetName, targetAttribute, maxDepth = 3 },
    type,
  },
  value: initialValue,
  onChange,
  ...props
}) => {
  const {
    layout: { attributes },
    ...cme
  } = useCMEditViewDataManager();

  const target = useMemo(
    () => (targetName ? attributes[targetName]?.targetModel ?? null : null),
    [targetName, attributes]
  );

  const attribute = useMemo(
    () => (targetAttribute ? targetAttribute : null),
    [targetAttribute]
  );

  const value = useMemo(
    () => (initialValue && JSON.parse(initialValue)) ?? [],
    [initialValue]
  );
  const handleValueChange = (args: {
    value: CategorizerValue;
    depth: number;
  }) => {
    const newValue = [...value.splice(0, args.depth), args.value];
    onChange({
      target: {
        name,
        value: JSON.stringify(newValue),
        type: type,
      },
    });
  };
  // --------------------------
  // TODO: add model vliadation
  /* --------------------------
  const validTarget = {
    type: "relation",
    relation: "oneToMany",
    target: "api::tag.tag",
    targetModel: "api::tag.tag",
    relationType: "oneToMany",
  };
  */

  const inputs = useMemo(() => [...Array(maxDepth)], [maxDepth]);

  return (
    <Field name={name}>
      <Stack spacing={1}>
        <FieldLabel>{name}</FieldLabel>
        <Grid gap={4}>
          {inputs.map((_, i) => (
            <CategorizerInput
              value={value}
              target={target}
              attribute={attribute}
              onValueChange={handleValueChange}
              depth={i}
              maxDepth={maxDepth}
              key={i}
              parent={i === 0 ? null : value[i - 1] ?? undefined}
            />
          ))}
        </Grid>
      </Stack>
    </Field>
  );
};

export default Categorizer;
