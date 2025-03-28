import Multiselect from 'multiselect-react-dropdown'

export default function MultiSelect({ ...props }) {
  const style = {
    chips: {
      background: '#008a00',
      borderRadius: '0.5rem',
    },
    singleChip: {
      color: 'white',
    },
    optionListContainer: {
      border: '1px solid #008a00',
    },
    option: {
      verticalAlign: 'middle',
    },
    inputField: {
      color: '#212529',
    },
    searchBox: {
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#212529',
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
      border: '1px solid #ced4da',
      appearance: 'none',
      borderRadius: '0.375rem',
      transition:
        'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    },
    searchInput: {
      padding: 0,
    },
  }
  return (
    <Multiselect
      emptyRecordMsg="Không có lựa chọn phù hợp"
      avoidHighlightFirstOption
      keepSearchTerm
      style={style}
      {...props}
    />
  )
}
