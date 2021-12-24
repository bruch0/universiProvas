import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';

import DropdownInput from '../Components/Shared/LargeDropdown';
import Loading from '../Components/Shared/Loading';

import {
  getUniversities,
  getCourses,
  getPostTestInfo,
  uploadTest,
} from '../Services/api';

function SubmitTest() {
  const [universities, setUniversities] = useState([]);
  const [chosenUniversity, setChosenUniversity] = useState('');
  const [universityId, setUniversityId] = useState(0);
  const [courses, setCourses] = useState([]);
  const [chosenCourse, setChosenCourse] = useState('');
  const [courseId, setCourseId] = useState(0);
  const [professors, setProfessors] = useState([]);
  const [chosenProfessor, setChosenProfessor] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [chosenSubject, setChosenSubject] = useState('');
  const [periods, setPeriods] = useState([]);
  const [chosenPeriod, setChosenPeriod] = useState('');
  const [testTypes, setTestType] = useState([]);
  const [chosenTestType, setChosenTestType] = useState('');
  const [testInfo, setTestInfo] = useState({
    professorId: 0,
    subjectId: 0,
    period: 0,
    typeId: 0,
    file: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getUniversities().then((response) => {
      setUniversities(response.data);
      setLoading(false);
    });
  }, []);

  const resetTestInfo = (includingCourse) => {
    if (includingCourse) {
      setChosenCourse('');
      setCourseId(0);
    }
    setChosenProfessor('');
    setChosenSubject('');
    setChosenPeriod('');
    setChosenTestType('');
    setTestInfo({
      professorId: 0,
      subjectId: 0,
      period: 0,
      typeId: 0,
      file: null,
    });
  };

  useEffect(() => {
    if (universityId) {
      resetTestInfo(true);
      setLoading(true);
      getCourses(universityId).then((response) => {
        setCourses(response.data);
        setLoading(false);
      });
    }
  }, [universityId]);

  useEffect(() => {
    if (courseId) {
      resetTestInfo(false);
      setChosenProfessor('');
      setChosenSubject('');
      setChosenPeriod('');
      setChosenTestType('');

      setLoading(true);
      getPostTestInfo(courseId).then((response) => {
        setProfessors(response.data.professors);
        setSubjects(response.data.subjects);
        setPeriods(response.data.availablePeriods);
        setTestType(response.data.testTypes);
        setLoading(false);
      });
    }
  }, [courseId]);

  if (loading) return <Loading />;

  const onSubmit = (e) => {
    e.preventDefault();

    const fileType = testInfo.file?.type.split('/')[1];
    if (
      !testInfo.professorId ||
      !testInfo.subjectId ||
      !testInfo.typeId ||
      !testInfo.period
    ) {
      Swal.fire('Preencha todos os campos');
    } else if (fileType !== 'pdf') {
      Swal.fire('Insira um documento PDF');
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
      name: 'Universidade',
      handler: (choice) => {
        setChosenUniversity(choice.initials);
        setUniversityId(choice.id);
      },
      state: chosenUniversity,
      possibleStates: universities,
    },
    {
      name: 'Curso',
      handler: (choice) => {
        setChosenCourse(choice.name);
        setCourseId(choice.id);
      },
      state: chosenCourse,
      possibleStates: courses,
      disabled: Boolean(!chosenUniversity),
    },
    {
      name: 'Professor',
      handler: (choice) => {
        setTestInfo({ ...testInfo, professorId: choice.id });
        setChosenProfessor(choice.name);
      },
      state: chosenProfessor,
      possibleStates: professors,
      disabled: Boolean(!chosenCourse),
    },
    {
      name: 'Matéria',
      handler: (choice) => {
        setTestInfo({ ...testInfo, subjectId: choice.id });
        setChosenSubject(choice.name);
      },
      state: chosenSubject,
      possibleStates: subjects,
      disabled: Boolean(!chosenProfessor),
    },
    {
      name: 'Período',
      handler: (choice) => {
        setTestInfo({ ...testInfo, period: choice.name });
        setChosenPeriod(choice.name);
      },
      state: chosenPeriod,
      possibleStates: periods,
      disabled: Boolean(!chosenSubject),
    },
    {
      name: 'Prova',
      handler: (choice) => {
        setTestInfo({ ...testInfo, typeId: choice.id });
        setChosenTestType(choice.name);
      },
      state: chosenTestType,
      possibleStates: testTypes,
      disabled: Boolean(!chosenPeriod),
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
          disabled={input.disabled}
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

  @media (max-width: 1000px) {
    width: 40%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
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
  text-align: center;
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
  margin-bottom: 30px;
  color: white;
  font-size: 25px;
  font-family: 'Quicksand';
  cursor: pointer;
`;
