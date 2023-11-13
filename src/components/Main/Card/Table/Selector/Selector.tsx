import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { memo, useEffect, useState } from "react";
import "./selector.scss";
import { useTypeSelector } from "../../../../../store/hooks/useTypeSelector";
import { IPropsSelector } from "../../../../../additionally/interfaces";

const Selector: React.FC<IPropsSelector> = memo(
  ({
    isStatus,
    id,
    className,
    nameNewTeacher,
    setNameNewTeacher,
    nameSelector,
    form
  }) => {
    const { teachers } = useTypeSelector((state) => state.data);
    const [value, setValueSelector] = useState<string | null>(teachers[0].name);
    const { setValue } = form;
    
    useEffect(() => {
      !isStatus && nameNewTeacher && setValueSelector(nameNewTeacher);
      !isStatus && nameNewTeacher && setValue(id.split('_').join('.'), teachers.filter((item) => item.name === nameNewTeacher)[0].id);      
    }, [nameNewTeacher]);

    const changeValueSelector = (event: any, newValue: string | null) => {
      setValueSelector(newValue ? newValue : teachers[0].name);
      setValue(id.split('_').join('.'), newValue ? teachers.filter((item) => item.name === newValue)[0].id : teachers[0].id);
      setNameNewTeacher && setNameNewTeacher("");
      event
    };
    return (
      <div className="selector">
        <Autocomplete

          disablePortal
          readOnly={isStatus}
          options={[...teachers.map((item) => item.name)]}
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
            <TextField         
            {...params} label={nameSelector} variant="outlined" />
          )}
        />
      </div>
    );
  }
);

export default Selector;
