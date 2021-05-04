import React, { useState } from "react";
import { ProgramModel } from "../../models/ProgramModel";
import { Modal, Form, Button, Icon, Message } from "semantic-ui-react";
import { TechnologyModel } from "../../models/TechnologyModel";
//import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface ProgramFormProps {
  formType: "New" | "Edit";
  index: string;
  programProp?: ProgramModel;
  technologys: TechnologyModel[];
  editProgram: Function;
  createProgram: Function;
}

const ProgramForm = (props: ProgramFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const emptyProgram: ProgramModel = {
    id: "",
    title: "",
    technologysIds: [],
    startDate: "",
    endDate: "",
    description: "",
  };

  const [program, setProgram] = useState<ProgramModel>(emptyProgram);

  const { technologys } = props;

  const options = technologys.map((technology) => {
    return {
      text: technology.name,
      value: technology.id,
    };
  });

  const handleInputChange = (name: string, value: string | string[] | any) => {
    const updatedProgram = {
      ...program,
      [name]: value,
    };
    setProgram(updatedProgram);
  };

  const isFormValid = () => {
    if (!program) return false;
    else if (!program.title) return false;
    else if (!program.technologysIds || program.technologysIds.length === 0)
      return false;
    else if (!program.startDate) return false;
    else if (!program.endDate) return false;
    else if (!program.description) return false;
    return true;
  };

  const handleSubmit = (event: any) => {
    if (!isFormValid()) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const { editProgram, createProgram, index } = props;

    if (isNewForm()) {
      createProgram(program);
    } else {
      editProgram(index, program);
    }
    closeForm();
  };

  const showForm = () => {
    const { programProp } = props;
    setIsModalOpen(true);
    setProgram(programProp || emptyProgram);
  };

  const closeForm = () => setIsModalOpen(false);
  const isNewForm = () => props.formType === "New";
  return (
    <Modal
      trigger={
        <Button icon onClick={showForm}>
          <Icon name={isNewForm() ? "plus" : "edit"} />
        </Button>
      }
      closeIcon
      open={isModalOpen}
      onClose={closeForm}
    >
      <Modal.Header>
        {isNewForm() ? "Add Photo" : `Edit: ${program.title}`}
      </Modal.Header>
      <Modal.Content>
        <Form error={isError}>
          <Message error content="Fill out all fields and try again..." />
          <Form.Input
            name="title"
            label="Title"
            placeholder="Program title"
            defaultValue={isNewForm() ? "" : program.title}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          <Form.Dropdown
            name="technologysIds"
            label="Technology"
            placeholder="Program technology"
            defaultValue={isNewForm() ? "" : program.technologysIds}
            onChange={(e, data) => handleInputChange(data.name, data.value)}
            required
            fluid
            multiple
            selection
            options={options}
          />
          <Form.Input
            name="startDate"
            label="Start Date"
            placeholder="Program start date"
            defaultValue={isNewForm() ? "" : program.startDate}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          <Form.Input
            name="endDate"
            label="End Date"
            placeholder="Program end date"
            defaultValue={isNewForm() ? "" : program.endDate}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          <Form.TextArea
            name="description"
            label="Description"
            placeholder="Tell more about the program..."
            defaultValue={isNewForm() ? "" : program.description}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          icon="save"
          content="Save"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ProgramForm;
