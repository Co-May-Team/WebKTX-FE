import ReactSelect from 'react-select'

const styles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#20c997' : 'white',
    }),
}

function Select(props) {
    return <ReactSelect styles={styles} {...props} />
}

Select.propTypes = {}

export default Select
