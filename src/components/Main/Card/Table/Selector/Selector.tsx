import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { memo, useEffect, useState } from "react";
import "./selector.scss";
import { useTypeSelector } from "../../../../../store/hooks/useTypeSelector";
import {
  IPropsSelector,
  ITeacher,
} from "../../../../../additionally/interfaces";
import { RootState } from "../../../../../store/reducers";

const Selector: React.FC<IPropsSelector> = memo(
  ({
    isStatus,
    id,
    className,
    nameNewTeacher,
    setNameNewTeacher,
    nameSelector,
    form,
  }) => {
    const { teachers } = useTypeSelector((state: RootState) => state.data);
    const [value, setValueSelector] = useState<string | null>(null);
    const [listTeacher, setListTeacher] = useState<ITeacher[]>();
    const { setValue } = form;

    useEffect(() => {
      setListTeacher([...teachers]);
    }, [teachers]);

    useEffect(() => {
      listTeacher && setValueSelector(listTeacher[0].name);
    }, [listTeacher]);

    useEffect(() => {
      !isStatus && nameNewTeacher && setValueSelector(nameNewTeacher);
      !isStatus &&
        nameNewTeacher &&
        listTeacher &&
        setValue(
          id.split("_").join("."),
          listTeacher.filter((item) => item.name === nameNewTeacher)[0].id
        );
    }, [nameNewTeacher]);

    const changeValueSelector = (event: any, newValue: string | null) => {
      if (listTeacher) {
        setValueSelector(newValue ? newValue : listTeacher[0].name);
        setValue(
          id.split("_").join("."),
          newValue
            ? listTeacher.filter((item) => item.name === newValue)[0].id
            : listTeacher[0].id
        );
      }
      setNameNewTeacher && setNameNewTeacher("");
      event;
    };
    return (
      <div className="selector">
        <Autocomplete
          disablePortal
          readOnly={isStatus}
          options={listTeacher ? [...listTeacher.map((item) => item.name)] : []}
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
  }
);

export default Selector;
