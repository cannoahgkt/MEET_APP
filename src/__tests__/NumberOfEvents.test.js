import NumberOfEvents from "../components/NumberOfEvents";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe('<NumberOfEvents /> component', ()=>{
    let NumberOfEventsComponent;
    beforeEach(()=>{
        NumberOfEventsComponent= render(
        <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
        )
    })
    test('has an element with role of a textbox', ()=>{
        const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextbox).toBeInTheDocument();
        expect(numberTextbox).toHaveClass('textboxNumber');
    });
    test('by default, number of event is listed 32', ()=>{
        expect(NumberOfEventsComponent.queryByRole('textbox')).toHaveValue('32');
    });
    
    test('updates number of events when user types', async()=>{
        const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
        await userEvent.type(numberTextbox, "{backspace}{backspace}10");
        expect(numberTextbox.value).toBe("10");
    });
})