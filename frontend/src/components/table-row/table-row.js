import styled from 'styled-components'

const TableRowContainer = ({className, children}) => (
    <div className = {className}>
        {children}
    </div>
);

export const TableRow = styled(TableRowContainer)`
    display: flex;
    align-items: center;
    border: ${({border}) => (border ? '1px solid #000' : 'none')  };

    & > div {
        display: flex;
        padding: 0 10px;
    }

    &  .description-column {
        width: 250px;
    }

    &  .direction-column {
        width: 120px;
    }

    &  .type-column {
        width: 140px;
    }

    &  .iconurl-column {
        display: flex;
        flex-direction: row;
        width: auto;
    }
`
