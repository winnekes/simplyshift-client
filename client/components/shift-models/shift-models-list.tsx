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
  Icon,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Dispatch, SetStateAction, useState } from "react";
import { ShiftModel } from "../../types";
import { AddModelModal } from "./add-model-modal";
import { ConfirmDeleteModel } from "./confirm-delete-model";
import { EditModelModal } from "./edit-model-modal";

type Props = {
  shiftModels: ShiftModel[];
  selectedModelId: number;
  setSelectedModelId: Dispatch<SetStateAction<number>>;
};

export const ShiftModelsList = ({
  shiftModels,
  selectedModelId,
  setSelectedModelId,
}: Props) => {
  const [showAddModelModal, setShowModelModal] = useState(false);
  const [selectedModelForEditing, setSelectedModelForEditing] =
    useState<ShiftModel | null>(null);
  const [selectedModelForDeleting, setSelectedModelForDeleting] =
    useState<ShiftModel | null>(null);

  const selectModelHandler = (id: number) => {
    if (selectedModelId === id) {
      return setSelectedModelId(null);
    }
    return setSelectedModelId(id);
  };

  return (
    <>
      <Flex align="stretch">
        {shiftModels.map((model) => (
          <HStack spacing={4} key={model.id}>
            <Tag
              bg={model.color}
              borderRadius="10px"
              cursor="pointer"
              onClick={() => selectModelHandler(model.id)}
            >
              <TagLabel>{model.name}</TagLabel>
              <Popover gutter={12} placement="top" isLazy>
                <PopoverTrigger>
                  <TagRightIcon boxSize="12px" as={ViewIcon} />
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
                        onClick={() => setSelectedModelForDeleting(model)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        variant="ghost"
                        padding="1"
                        size="sm"
                        onClick={() => setSelectedModelForEditing(model)}
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
            </Tag>
          </HStack>
        ))}
        <Tag
          borderRadius="10px"
          cursor="pointer"
          onClick={() => setShowModelModal(true)}
        >
          <Icon boxSize="12px" as={AddIcon} />
        </Tag>
      </Flex>

      {selectedModelForEditing && (
        <EditModelModal
          model={selectedModelForEditing}
          onClose={() => setSelectedModelForEditing(null)}
        />
      )}
      {selectedModelForDeleting && (
        <ConfirmDeleteModel
          shiftModel={selectedModelForDeleting}
          onClose={() => setSelectedModelForDeleting(null)}
        />
      )}
      {showAddModelModal && (
        <AddModelModal onClose={() => setShowModelModal(false)} />
      )}
    </>
  );
};
