import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./NavBar";

function MainTemplate( props ) {
    return (
        <Grid
            templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
            gridTemplateRows={'50px 1fr 30px'}
            gridTemplateColumns={'250px 1fr'}
            h='100%'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
        >
            <GridItem pl='2' bg='orange.300' area={'header'}>
                Header
            </GridItem>
            <GridItem pl='2' bg='pink.300' area={'nav'} p={5}>
                <NavBar />
            </GridItem>
            <GridItem pl='2' bg='green.300' area={'main'} p={5}>
                { props.children }
            </GridItem>
            <GridItem pl='2' bg='blue.300' area={'footer'}>
                Footer
            </GridItem>
        </Grid>
    )
}
export default MainTemplate