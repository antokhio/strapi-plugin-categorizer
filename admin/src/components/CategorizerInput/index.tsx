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

interface CategorizerInputProps {
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
}

const CategorizerInput: React.FC<CategorizerInputProps> = ({
  name,
  ...props
}) => {
  return <Field name={name}>Hello</Field>;
};

export default CategorizerInput;
