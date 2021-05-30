const { Box, CircularProgress, Typography } = require("@material-ui/core");

export function NumberCircularProgress(props) {
    return (
        <Box position="relative" display="inline-block"

            style={{ marginTop: 20, marginBottom: 20 }}
        >
            <Box top={0} left={0} bottom={0} right={0} position="absolute">
                <CircularProgress
                    size={110}
                    variant="indeterminate"

                />
            </Box>
            <CircularProgress size={110} variant="static" value={props.value}


            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h5" component="div"  >{`${props.value
                    }%`}</Typography>
            </Box>
        </Box>
    );
}
