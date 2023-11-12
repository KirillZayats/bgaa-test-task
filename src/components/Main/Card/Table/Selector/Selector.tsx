import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./selector.scss";

interface IProps {
  teachers: string[];
}

const Selector = ({ teachers }: IProps) => {
  const [value, setValue] = useState<string | null>(teachers[0]);

  return (
    <div className="selector">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={teachers}
        defaultValue={teachers[0]}
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue ? newValue : teachers[0]);
        }}
        sx={{
          marginLeft: 1,
          marginRight: 1,
          bgcolor: "#fff",
          div: {
            height: 39,
          },
        }}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
    </div>
  );
};

export default Selector;
