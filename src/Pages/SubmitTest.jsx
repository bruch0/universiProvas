/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';

import DropdownInput from '../Components/Shared/LargeDropdown';
import Loading from '../Components/Shared/Loading';

import { getPostTestInfo, uploadTest } from '../Services/api';

function SubmitTest() {
  const [professors, setProfessors] = useState([]);
  const [choosedProfessor, setChoosedProfessor] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [choosedSubject, setChoosedSubject] = useState('');
  const [periods, setPeriods] = useState([]);
  const [choosedPeriod, setChoosedPeriod] = useState('');
  const [testType, setTestType] = useState([]);
  const [choosedTestType, setChoosedTestType] = useState('');
  const [testInfo, setTestInfo] = useState({
    professorId: 0,
    subjectId: 0,
    period: 0,
    url: 0,
    typeId: 0,
    file: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPostTestInfo().then((response) => {
      setProfessors(response.data.professors);
      setSubjects(response.data.subjects);
      setPeriods(response.data.availablePeriods);
      setTestType(response.data.testTypes);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  const onSubmit = (e) => {
    e.preventDefault();

    const fileType = testInfo.file?.type.split('/')[1];
    if (fileType !== 'pdf') {
      Swal.fire('Insira um documento PDF');
    } else if (
      !testInfo.professorId ||
      !testInfo.subjectId ||
      !testInfo.typeId ||
      !testInfo.period
    ) {
      Swal.fire('Preencha todos os campos');
    } else {
      const formData = new FormData();
      formData.append('file', testInfo.file);
      formData.append('professorId', testInfo.professorId);
      formData.append('subjectId', testInfo.subjectId);
      formData.append('typeId', testInfo.typeId);
      formData.append('period', testInfo.period);

      uploadTest(formData).then(() => {
        Swal.fire('Obrigado por compartilhar!');
        navigate('/');
      });
    }
  };

  const inputs = [
    {
      name: 'Professor',
      handler: (choice) => {
        setTestInfo({ ...testInfo, professorId: choice.id });
        setChoosedProfessor(choice.name);
      },
      state: choosedProfessor,
      possibleStates: professors,
    },
    {
      name: 'Matéria',
      handler: (choice) => {
        setTestInfo({ ...testInfo, subjectId: choice.id });
        setChoosedSubject(choice.name);
      },
      state: choosedSubject,
      possibleStates: subjects,
    },
    {
      name: 'Período',
      handler: (choice) => {
        setTestInfo({ ...testInfo, period: choice.name });
        setChoosedPeriod(choice.name);
      },
      state: choosedPeriod,
      possibleStates: periods,
    },
    {
      name: 'Prova',
      handler: (choice) => {
        setTestInfo({ ...testInfo, typeId: choice.id });
        setChoosedTestType(choice.name);
      },
      state: choosedTestType,
      possibleStates: testType,
    },
  ];

  return (
    <TestPage>
      <Title>UNIVERSIPROVAS</Title>
      <Disclaimer onClick={onSubmit}>
        Insira aqui as informações do teste que você quer enviar!
      </Disclaimer>
      {inputs.map((input) => (
        <DropdownInput
          name={input.name}
          handler={input.handler}
          state={input.state}
          possibleStates={input.possibleStates}
          key={input.name}
        />
      ))}
      <Holder encType="multipart/form-data" onSubmit={onSubmit}>
        <Label htmlFor="file-input">
          {testInfo.file?.name.replace('.pdf', '') || 'Selecione um arquivo'}
        </Label>
        <File
          multiple={false}
          accept=".pdf"
          id="file-input"
          onChange={(e) =>
            setTestInfo({ ...testInfo, file: e.target.files[0] })
          }
          type="file"
          name="oie"
        />
        <Send type="submit">Enviar</Send>
      </Holder>
    </TestPage>
  );
}

export default SubmitTest;

const TestPage = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cecfe5;
  color: white;
`;

const Title = styled.p`
  font-size: 6vw;
  margin-top: 30px;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 10vw;
  }
`;

const Disclaimer = styled.p`
  font-size: 2vw;
  margin: 30px 0px;
  font-weight: 500;

  @media (max-width: 600px) {
    font-size: 4vw;
    text-align: center;
  }
`;

const Holder = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const Label = styled.label`
  width: 100%;
  height: 50px;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  font-weight: 700;
  box-shadow: 0px 3px 10px rgb(0 0 0 / 25%);
  margin-bottom: 30px;
  cursor: pointer;
`;

const File = styled.input`
  display: none;
`;

const Send = styled.button`
  width: 100%;
  height: 50px;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 3px 10px rgb(0 0 0 / 25%);
  color: white;
  font-size: 25px;
  font-family: 'Quicksand';
  cursor: pointer;
`;
