import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";


export default function ParameterView(props) {

    const { enabled, value, title, valueType, name } = { ...props.parameter }
    const { handleParameterChange, handleParameterEnableSwap } = { ...props }
    return (
        <div
            style={{
                alignItems: "center",
                // justifyContent: "center",
                display: "flex"


            }}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        checked={enabled}
                        onChange={handleParameterEnableSwap}
                        name={name}
                        color="primary"
                    />
                }
                label={title}
            />

            <TextField
                // id="outlined-number"
                // label="Number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                name={name}
                type={"number"}
                format={'number'}
                value={value}
                disabled={!enabled}
                style={{
                    width: "20%"
                }}
                // onClick={handleClick}
                onChange={
                    (e) => {
                        console.log("hand target value is ", e.target.value)

                        const repValue = e.target.value.replace(/\D+/g, '');
                        console.log("hand target value is ", value)

                        if (repValue === "" && value)
                            handleParameterChange(e, value)
                        else
                            handleParameterChange(e, repValue)

                    }
                }
                variant="outlined"
            />
        </div>
    )
}