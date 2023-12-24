import Row from "../Row";
import KeyBoardButton from "./Button";

type propsTypes = { onButtonClick: Function };

const Board = ({ onButtonClick }: propsTypes) => {
  return (
    <div>
      <div>
        <Row>
          <KeyBoardButton onClick={onButtonClick} label={1} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={2} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={3} isSpecial={false}/>
          <KeyBoardButton
            value={"clear"}
            onClick={onButtonClick}
            label={<span>&#x2190;</span>}
            isSpecial
          />
        </Row>
        <Row>
          <KeyBoardButton onClick={onButtonClick} label={4} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={5} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={6} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={"-"} isSpecial/>
        </Row>

        <Row>
          <KeyBoardButton onClick={onButtonClick} label={7} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={8} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={9} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={"+"} isSpecial/>
        </Row>
        <Row>
          <KeyBoardButton onClick={onButtonClick} label={0} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={"00"} isSpecial={false}/>
          <KeyBoardButton onClick={onButtonClick} label={"."} isSpecial/>
          <KeyBoardButton onClick={onButtonClick} label={"AC"} value={"reset"} isSpecial/>
        </Row>
      </div>
    </div>
  );
};

export default Board;
