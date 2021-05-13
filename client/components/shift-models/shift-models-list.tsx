import {
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagLabel,
  TagRightIcon,
  Spacer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR, { mutate } from "swr";
import { api, fetcher } from "../../services/api";
import { ShiftModel } from "../../types";
import { ErrorContainer } from "../common/error-container";
import { Loading } from "../common/loading";
import { EditModelModal } from "./edit-model-modal";

type Props = {
  selectedModelId: number;
  setSelectedModelId: Dispatch<SetStateAction<number>>;
};

export const ShiftModelsList = ({
  selectedModelId,
  setSelectedModelId,
}: Props) => {
  const [selectedModelForEdit, setSelectedModelForEdit] =
    useState<ShiftModel | null>(null);

  const { data, error } = useSWR<ShiftModel[]>("/shift-model", fetcher);

  if (error) return <ErrorContainer />;
  if (!data) return <Loading />;

  const deleteModel = async (id: number) => {
    await api.delete(`/shift-model/${id}`);
    await mutate("/shift-model");
  };

  const selectModelHandler = (id: number) => {
    if (selectedModelId === id) {
      return setSelectedModelId(null);
    }
    return setSelectedModelId(id);
  };
  console.log({ data });

  return (
    <>
      <Flex align="stretch">
        {data.map((model) => (
          <HStack spacing={4} key={model.id}>
            <Tag
              bg={model.color}
              borderRadius="full"
              as="button"
              onClick={() => selectModelHandler(model.id)}
            >
              <TagLabel>
                {model.name}
                <Popover gutter={12} placement="top" isLazy>
                  <PopoverTrigger>
                    <TagRightIcon boxSize="12px" margin="2px" as={ViewIcon} />
                  </PopoverTrigger>
                  <PopoverContent maxWidth="250px">
                    <PopoverArrow />
                    <PopoverHeader border="0" fontWeight="bold">
                      <Flex alignItems="center">
                        {model.name}
                        <Spacer />
                        <Button
                          variant="ghost"
                          padding="1"
                          size="sm"
                          onClick={() => deleteModel(model.id)}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          padding="1"
                          size="sm"
                          onClick={() => setSelectedModelForEdit(model)}
                        >
                          <EditIcon />
                        </Button>
                      </Flex>
                    </PopoverHeader>
                    <PopoverBody>
                      Start time:{" "}
                      {moment(model.startsAt, "HH:mm").format("HH:mm")} <br />
                      Ends at: {moment(model.endsAt, "HH:mm").format("HH:mm")}
                      <br />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </TagLabel>
            </Tag>
          </HStack>
        ))}
      </Flex>
      {selectedModelForEdit && (
        <EditModelModal
          model={selectedModelForEdit}
          onClose={() => setSelectedModelForEdit(null)}
        />
      )}
    </>
  );
};
