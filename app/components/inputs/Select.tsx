"use client";

import ReactSelect from "react-select";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled
}) => {
  return ( 
  <div className="z-[100]">
    <label
      className="
        block
        text-sm
        font-medium
        leading-6
        text-textColor
      "
    >
      {label}
    </label>
    <div className="mt-2">
      <ReactSelect
        placeholder='Select Members...'
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        options={options}
        menuPortalTarget={document.body}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: '#2a3942',
            color: '#c2cacf',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '2px 6px',
            boxShadow: state.isFocused
              ? 'inset 0 0 0 2px #0284c7'
              : 'none',
            transition: 'box-shadow 0.2s ease'
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#2a3942',
            borderRadius: '0.375rem',
            zIndex: 9999,
          }),
          menuList: (base) => ({
            ...base,
            backgroundColor: '#2a3942',
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#111b21' : '#2a3942',
            color: '#fff',
            cursor: 'pointer',
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#1e293b',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#f1f5f9',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#f1f5f9',
            ':hover': {
              backgroundColor: '#334155',
              color: 'white',
            },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: '#cbd5e1',
            ':hover': {
              color: '#f1f5f9',
            },
          }),
          
          clearIndicator: (base) => ({
            ...base,
            color: '#cbd5e1',
            ':hover': {
              color: '#f87171',
            },
          }),
        }}
        classNames={{
          control: () => "text-sm"
        }}
      />
    </div>
  </div>
   );
}
 
export default Select;