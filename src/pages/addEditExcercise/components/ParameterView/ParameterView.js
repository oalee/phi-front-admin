import { t } from "@lingui/macro";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import themes from "../../../../themes";


export default function ParameterView(props) {

    const { enabled, value, secondValue, title, valueType, name } = { ...props.parameter }
    const { handleParameterChange, handleParameterEnableSwap } = { ...props }
    return (
        <div
            style={{
                alignItems: "center",
                // justifyContent: "center",
                display: "flex",
                // width: "25%"
                // ,
                margin: 30
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
                label={(valueType === "time") ? t`seconds` : null}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                name={name}
                type={"number"}
                format={'number'}
                value={value}
                disabled={!enabled}
                style={{
                    width: 75
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

            {
                valueType === "time" &&
                <TextField
                    // id="outlined-number"
                    label={t`minute`}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    name={name}
                    type={"number"}
                    format={'number'}
                    value={secondValue}
                    disabled={!enabled}
                    style={{
                        width: 75,
                        marginInlineStart: 5
                    }}
                    // onClick={handleClick}
                    onChange={
                        (e) => {
                            console.log("hand target value is ", e.target.value)

                            const repValue = e.target.value.replace(/\D+/g, '');
                            console.log("hand target value is ", value)

                            if (repValue === "" && value)
                                handleParameterChange(e, value, false)
                            else
                                handleParameterChange(e, repValue, false)

                        }
                    }
                    variant="outlined"
                />
            }
        </div>
    )
}