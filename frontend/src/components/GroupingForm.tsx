import {useState} from 'react';
import { Container, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

const GroupingForm = ({ setGrouping }: { setGrouping: (grouping: string) => void }) => {
    const [groupingValue, setGroupingValue] = useState("");
    const store = useSelector((state: RootState) => state.user);

    const handleGroupingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        setGroupingValue(value);
        setGrouping(value);
    };

    return (
        <Container sx={{ mt: 12 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Группировка по:</InputLabel>
                {/*// @ts-ignore*/}
                <Select value={groupingValue} onChange={handleGroupingChange}>
                    <MenuItem value="none">Без группировки</MenuItem>
                    <MenuItem value="today">На сегодня</MenuItem>
                    <MenuItem value="week">На неделю</MenuItem>
                    <MenuItem value="future">На будущее</MenuItem>
                    {store!.role === 'Руководитель' && <MenuItem value="assignee">По ответственным(А-Я)</MenuItem>}
                </Select>
            </FormControl>
        </Container>

    );
};

export default GroupingForm;