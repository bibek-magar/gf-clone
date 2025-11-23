import styled from "styled-components";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Radios,
} from "../../components";
import { ArrowLeftRight } from "lucide-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { currentTheme } from "../../utils/theme";

type IType = "one-way" | "round-trip";

const formSchema = z
  .object({
    type: z.string().min(1, "Required!"),
    from: z
      .any()
      .refine((val) => val && val.skyId, "Please select departure airport"),
    to: z
      .any()
      .refine((val) => val && val.skyId, "Please select destination airport"),
    departure: z
      .date()
      .min(
        dayjs().startOf("day").toDate(),
        "Departure date cannot be in the past"
      ),
    return: z.date().optional().nullable(),
    passengers: z.number().min(1, "Required!"),
  })
  .superRefine((val, ctx) => {
    if (val.type === "round-trip" && !val.return) {
      ctx.addIssue({
        path: ["return"],
        code: z.ZodIssueCode.custom,
        message: "Return date is required for a round‑trip",
      });
    }

    // Extra guard: if both dates exist, return must be after departure
    if (val.departure && val.return && val.return <= val.departure) {
      ctx.addIssue({
        path: ["return"],
        code: z.ZodIssueCode.custom,
        message: "Return date must be after departure",
      });
    }
  });

export type FormSchema = z.infer<typeof formSchema>;

const Home = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "round-trip" as IType,
      from: "",
      to: "",
      passengers: 1,
    },
    mode: "onSubmit",
  });

  const tripType = watch("type");

  useEffect(() => {
    if (tripType === "one-way") {
      setValue("return", null);
      clearErrors("return");
    }
  }, [tripType, setValue, clearErrors]);

  const onSubmit = (data: FormSchema) => {
    const formData = {
      originSkyId: data.from?.skyId,
      destinationSkyId: data.to?.skyId,
      departureDate: dayjs(data.departure).format("YYYY-MM-DD"),
      returnDate: data.return ? dayjs(data.return).format("YYYY-MM-DD") : null,
      adults: data.passengers,
      originEntityId: data.from?.entityId,
      destinationEntityId: data.to?.entityId,
    };

    // Filtering out null values for URLSearchParams
    const searchParams = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value !== null)
    );

    console.log(searchParams, data);

    navigate(`/search-results?${new URLSearchParams(searchParams).toString()}`);
  };

  return (
    <Wrapper>
      <HeroSection>
        <h1>Flights</h1>
      </HeroSection>

      <SearchContainer>
        <SearchCard onSubmit={handleSubmit(onSubmit)}>
          <TopControls>
            <Radios
              control={control}
              name="type"
              items={[
                { label: "Round trip", value: "round-trip" },
                { label: "One way", value: "one-way" },
              ]}
            />
            <PassengerSelector>
              <InputNumber
                value={getValues("passengers")}
                onChange={(value) => {
                  setValue("passengers", value, {
                    shouldValidate: false,
                    shouldDirty: false,
                    shouldTouch: false,
                  });
                  clearErrors("passengers");
                }}
                label="Passengers"
                error={errors.passengers?.message || ""}
              />
            </PassengerSelector>
          </TopControls>

          <SearchInputs>
            <SingleLineInputs>
              <LocationInputs>
                <Input
                  label="Where From?"
                  onSelect={(value) => {
                    setValue("from", value, { shouldDirty: true });
                    clearErrors("from");
                  }}
                  value={watch("from")}
                  error={errors.from?.message?.toString() || ""}
                />
                <SwapButton
                  type="button"
                  onClick={() => {
                    const from = getValues("from");
                    const to = getValues("to");
                    setValue("from", to, { shouldDirty: true });
                    setValue("to", from, { shouldDirty: true });
                    clearErrors(["from", "to"]);
                  }}
                >
                  <ArrowLeftRight size={16} />
                </SwapButton>
                <Input
                  label="Where To?"
                  onSelect={(value) => {
                    setValue("to", value, { shouldDirty: true });
                    clearErrors("to");
                  }}
                  value={watch("to")}
                  error={errors.to?.message?.toString() || ""}
                />
              </LocationInputs>

              <DateInputs>
                <DatePicker
                  control={control}
                  name="departure"
                  label="Departure"
                  error={errors.departure?.message || ""}
                  minDate={dayjs().startOf("day")}
                  maxDate={
                    watch("return")
                      ? dayjs(watch("return")).subtract(1, "day")
                      : undefined
                  }
                />
                {watch("type") === "round-trip" && (
                  <DatePicker
                    control={control}
                    name="return"
                    label="Return"
                    error={errors.return?.message || ""}
                    minDate={
                      watch("departure")
                        ? dayjs(watch("departure")).add(1, "day")
                        : dayjs().add(1, "day")
                    }
                  />
                )}
              </DateInputs>
            </SingleLineInputs>
          </SearchInputs>

          <SearchButton>
            <Button>Explore</Button>
          </SearchButton>
        </SearchCard>
      </SearchContainer>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${currentTheme.background} 0%,
    #010409 100%
  );
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 0;
    min-height: 100vh;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 80px 20px 40px;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 2.75rem;
    font-weight: 400;
    color: ${currentTheme.text};
    margin: 0;
    letter-spacing: -0.02em;

    @media (max-width: 1024px) {
      font-size: 2.5rem;
      padding: 60px 20px 30px;
    }

    @media (max-width: 768px) {
      font-size: 2.25rem;
      padding: 40px 16px 24px;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
      padding: 32px 12px 20px;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 12px 24px;
  }

  @media (max-width: 480px) {
    padding: 0 8px 20px;
  }
`;

const SearchCard = styled.form`
  background: ${currentTheme.surface};
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 16px ${currentTheme.shadow};
  width: 100%;
  max-width: 1400px;
  border: 1px solid ${currentTheme.border};

  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 28px;
  }

  @media (max-width: 1024px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    padding: 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    margin: 0 8px;
  }
`;

const TopControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 24px;
  }
`;

const PassengerSelector = styled.div`
  display: flex;
  align-items: center;

  .input-wrapper {
    min-width: 120px;

    @media (max-width: 480px) {
      min-width: 100px;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const SearchInputs = styled.div`
  margin-bottom: 0;
`;

const SingleLineInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: flex-end;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const LocationInputs = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: ${currentTheme.surface};
  overflow: hidden;
  position: relative;
  width: 100%;

  .input-wrapper {
    flex: 1;
    min-width: 0;
    max-width: 50%;
  }

  @media (max-width: 640px) {
    flex-direction: column;

    .input-wrapper {
      width: 100%;
      max-width: none;
    }
  }
`;
const SwapButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: ${currentTheme.searchBg};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${currentTheme.textSecondary};
  transition: all 0.2s ease;
  margin: 0px 8px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  align-self: center;

  &:hover {
    background: ${currentTheme.background};
    color: ${currentTheme.primary};
    transform: scale(1.1);
  }

  @media (max-width: 640px) {
    align-self: center;
    transform: rotate(90deg);
    margin: 8px 0;

    &:hover {
      transform: rotate(90deg) scale(1.1);
    }
  }
`;

const DateInputs = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  .input-wrapper {
    flex: 1;
    min-width: 0;
    max-width: 100%;

    label {
      color: ${currentTheme.text};
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      display: block;
    }
  }

  @media (max-width: 1024px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;

    .input-wrapper {
      max-width: none;
    }
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;

  button {
    padding: 14px 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 28px;
    background: ${currentTheme.primary};
    border: none;
    color: ${currentTheme.surface};
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 56px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 140px;
    box-shadow: 0 2px 8px rgba(88, 166, 255, 0.2);

    &:hover {
      background: ${currentTheme.primary};
      opacity: 0.9;
      box-shadow: 0 4px 16px rgba(88, 166, 255, 0.4);
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      width: 100%;
      max-width: 300px;
    }

    @media (max-width: 480px) {
      padding: 12px 24px;
      font-size: 14px;
      min-height: 48px;
    }
  }
`;
