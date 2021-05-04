import React, { useEffect, useState } from "react";
import * as api from "../../api";
import { ProgramModel } from "../../models/ProgramModel";
import { TechnologyModel } from "../../models/TechnologyModel";
import { ProgramList } from "../Program";

const Main = () => {
  const [programs, setPrograms] = useState<ProgramModel[]>([]);
  const [technologys, setTechnologys] = useState<TechnologyModel[]>([]);

  useEffect(() => {
    const localPrograms = localStorage.getItem("programs");
    const localTechnologys = localStorage.getItem("technologys");

    if (localPrograms && localTechnologys) {
      setPrograms(JSON.parse(localPrograms));
      setTechnologys(JSON.parse(localTechnologys));
    } else {
      const programResponse = api.getPrograms();
      setPrograms(programResponse);
      const technologyResponse = api.getTechonologys();
      setTechnologys(technologyResponse);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("programs", JSON.stringify(programs));
  }, [programs]);
  useEffect(() => {
    localStorage.setItem("technologys", JSON.stringify(technologys));
  }, [technologys]);

  const createProgram = (program: ProgramModel) => {
    const timestamp = Date.now();
    program.id = `program-${timestamp}`;
    setPrograms((prevPrograms) => [...prevPrograms, program]);
  };
  const editProgram = (key: string, updateProgram: ProgramModel) => {
    const updatePrograms = programs.map((program) =>
      program.id === key ? updateProgram : program
    );
    setPrograms(updatePrograms);
  };
  const deleteProgram = (key: string) => {
    const updatePrograms = programs.filter((program) => program.id !== key);
    setPrograms(updatePrograms);
  };

  const programList = () => (
    <ProgramList
      programs={programs}
      technologys={technologys}
      deleteProgram={deleteProgram}
      editProgram={editProgram}
      createProgram={createProgram}
    />
  );

  return programList();
};

export default Main;
