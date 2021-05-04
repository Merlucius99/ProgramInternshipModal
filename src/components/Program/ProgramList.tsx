import React from "react";
import { ProgramModel } from "../../models/ProgramModel";
import { Card } from "semantic-ui-react";
import { DeleteButton } from "../Common";
import Program, { ProgramForm } from "../Program";
import StatusBar from "../StatusBar";
import { TechnologyModel } from "../../models/TechnologyModel";

interface ProgramListProps {
  programs: ProgramModel[];
  technologys: TechnologyModel[];
  deleteProgram: (index: string) => void;
  editProgram: Function;
  createProgram: Function;
}

const ProgramList = ({ programs, technologys, deleteProgram, editProgram, createProgram}: ProgramListProps) => {
  // const getProgramTechnologys = (program: ProgramModel) => {
  //   return technologys.filter((technology) =>
  //     program.technologysIds.includes(technology.id)
  //   );
  // };
  const renderProgram = () => {
    return programs.map((program) => {
      //const programTechnology = getProgramTechnologys(program); o las aici pt cand o sa o punem coloana in tabel
      return (
        <Program key={program.id} program={program}>
          <ProgramForm
            formType="Edit"
            index={program.id}
            programProp={program}
            technologys={technologys}
            editProgram={editProgram}
            createProgram={createProgram}
          />
          <DeleteButton
            index={program.id}
            objectName={program.title}
            deleteObject={deleteProgram}
          />
        </Program>
      );
    });
  };
  return (
    <div>
      <StatusBar title={`${programs.length} Programs(s) total`}>
        <ProgramForm
          formType="New"
          createProgram={createProgram}
          technologys={technologys}
          index={""}
          editProgram={editProgram}
        />
      </StatusBar>
      <Card.Group itemsPerRow={6} doubling>
        {renderProgram()}
      </Card.Group>
    </div>
  );
};
export default ProgramList;
