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
  Grid,
  Select,
  Option,
  Box,
  Loader,
} from "@strapi/design-system";
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
      target: string;
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
    options: { target: fieldTarget },
  },
  value: initialValue,
  onChange,
  ...props
}) => {
  const {
    layout: { attributes },
    ...cme
  } = useCMEditViewDataManager();

  const { target } = attributes[fieldTarget];
  const value = initialValue ? JSON.parse(initialValue) : [];

  const handleValueChange = () => {};

  // TODO TARGET VALIDATION
  /*
  const validTarget = {
    type: "relation",
    relation: "oneToMany",
    target: "api::tag.tag",
    targetModel: "api::tag.tag",
    relationType: "oneToMany",
  };
  */

  console.log(target);
  return (
    <Field name={name}>
      <Stack spacing={1}>
        <FieldLabel>{name}</FieldLabel>
        <Grid gap={4}>
          <CategorizerInput
            name={name}
            value={value}
            target={target}
            onValueChange={handleValueChange}
          />
        </Grid>
      </Stack>
    </Field>
  );
};

export default Categorizer;
