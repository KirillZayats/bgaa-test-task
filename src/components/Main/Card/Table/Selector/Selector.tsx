import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import "./selector.scss";
import { useTypeSelector } from "../../../../../store/hooks/useTypeSelector";
import { IPropsSelector } from "../../../../../additionally/interfaces";

const Selector: React.FC<IPropsSelector> = ({
  isStatus,
  id,
  className,
  nameNewTeacher,
  setNameNewTeacher,
  nameSelector,
}) => {
  const { teachers } = useTypeSelector((state) => state.data);
  const [value, setValue] = useState<string | null>(teachers[0].name);

  useEffect(() => {
    console.log(nameNewTeacher);
    
    !isStatus && nameNewTeacher && setValue(nameNewTeacher);
  }, [nameNewTeacher]);

  const changeValueSelector = (event: any, newValue: string | null) => {
    setValue(newValue ? newValue : teachers[0].name);
    setNameNewTeacher && setNameNewTeacher("");
  };

  return (
    <div className="selector">
      <Autocomplete
        disablePortal
        readOnly={isStatus}
        options={[...teachers.map((item) => item.name)]}
        defaultValue={teachers[0].name}
        className={className}
        id={id}
        value={value}
        onChange={changeValueSelector}
        sx={{
          marginLeft: 1,
          marginRight: 1,
          bgcolor: "#fff",
          opacity: isStatus ? 0.5 : 1,
          div: {
            height: 39,
          },
        }}
        renderInput={(params) => (
          <TextField {...params} label={nameSelector} variant="outlined" />
        )}
      />
    </div>
  );
};

export default Selector;
