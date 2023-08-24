import { HandPalm, Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  InputTask,
  InputTaskMinutes,
  Separator,
  StartButtonContainer,
  StopButtonContainer,
} from "./style";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  start: Date;
  interruptedDate?:Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCyclesId, setActiveCyclesId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesId);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.start)
        );
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      start: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCyclesId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle(){
    setActiveCyclesId(null)
    setCycles(
      cycles.map(cycle=>{
        if(cycle.id === activeCyclesId){
          return {...cycle, interruptedDate: new Date()}
        }else{
          return cycle
        }
      })
    )
  }



  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);


  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <InputTask
            type="text"
            id="task"
            placeholder="De um nome para o seu projeto"
            {...register("task")}
            disabled={!!activeCycle}
          />

          <label htmlFor="minutesAmount"> durante</label>
          <InputTaskMinutes
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>
        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopButtonContainer onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopButtonContainer>
        ) : (
          <StartButtonContainer disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButtonContainer>
        )}
      </form>
    </HomeContainer>
  );
}
