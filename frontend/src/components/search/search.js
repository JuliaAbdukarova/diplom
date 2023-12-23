import styled from "styled-components";
import { Icon } from "../icon/icon";
import { Input } from "../input/input";

const SearchContainer = ({className, searchPhrase, onChange}) => {
    return (
        <div className={className}>
            <Input
                value = {searchPhrase}
                placeholder = "Поиск по заголовкам"
                onChange={onChange}
            />
            <div>
                <Icon
                    inactive={true}
                    icon_id="fa-search"
                    size="21px"
                />
            </div>
        </div>
    )
}

export const Search = styled(SearchContainer)`
    display: flex;
    position: relative;
    width: 340px;
    height: 40px;
    margin: 40px auto 0;

    & > input {
        padding: 10px 32px 10px 10px;

    }

    & > div {
        position: absolute;
        right: 9px;
        top: 3px;
    }
`
