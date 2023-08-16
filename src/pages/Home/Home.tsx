import { Play } from "phosphor-react";
import {
  ButtonContainer,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  InputTask,
  InputTaskMinutes,
  Separator,
} from "./style";

import { useForm } from "react-hook-form";

export function Home() {
  const {register, handleSubmit,watch} = useForm()

function handleCreateNewCycle(data:any){
    console.log(data)
}

const task = watch("task")
const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="taks">Vou trabalhar em</label>
          <InputTask type="text" id="taks"  placeholder="De um nome para o seu projeto" {...register("task")}/>

          <label htmlFor="minutesAmount"> durante</label>
          <InputTaskMinutes type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} 
          {...register("minutesAmount",{valueAsNumber:true})}
          />
          
          <span>minutos</span>
        </FormContainer>
        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>
        <ButtonContainer disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </ButtonContainer>
      </form>
    </HomeContainer>
  );
}
