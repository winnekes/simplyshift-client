import { Flex, HStack, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../services/api";
import { ShiftModel } from "../../types";
import { ViewModelModal } from "./view-model-modal";

export const ShiftModelsList = () => {
  const [
    selectedModelForView,
    setSelectedModelForView,
  ] = useState<ShiftModel | null>(null);

  const { data, error } = useSWR<ShiftModel[]>("/shift-model", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Flex align="stretch">
        {data.map((model) => (
          <HStack spacing={4} key={model.id}>
            <Tag bg={model.color} borderRadius="full">
              <TagLabel>
                {model.name}
                <TagRightIcon boxSize="12px" as={EditIcon} />
                <TagRightIcon
                  boxSize="12px"
                  as={ViewIcon}
                  onClick={() => setSelectedModelForView(model)}
                />
              </TagLabel>
            </Tag>
          </HStack>
        ))}
      </Flex>
      {selectedModelForView && (
        <ViewModelModal
          model={selectedModelForView}
          onClose={() => setSelectedModelForView(null)}
        />
      )}
    </>
  );
};
