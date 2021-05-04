import React from "react";
import { ProgramModel } from "../../models/ProgramModel";
import { Card, Button } from "semantic-ui-react";

interface ProgramProps {
  program: ProgramModel;
}

const Program: React.FC<ProgramProps> = ({ program, children }) => {
  return (
    <Card className="program">
      <Card.Content>
        <Card.Header>{program.title}</Card.Header>
        <Card.Meta>{program.description}</Card.Meta>
        <Card.Meta>
          {program.startDate} - {program.endDate}
        </Card.Meta>
      </Card.Content>
      <Button.Group basic attached="bottom">
        {children}
      </Button.Group>
    </Card>
  );
};

export default Program;
