import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../theme/colors';

type ModePickerProps = {
    value: any;
    setValue: (value: any) => void;
    item: any[];
    zIndex: number;
};

const DropDown: React.FC<ModePickerProps> = ({ value, setValue, item , zIndex}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems] = useState(item);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            placeholder='Select category'
            setValue={(callbackOrValue: any) => {
                if (typeof callbackOrValue === 'function') {
                    const result = callbackOrValue(value);
                    setValue(result);
                } else {
                    setValue(callbackOrValue);
                }
            }}
            style={{
                minHeight: hp(5),
                width: '100%',
                zIndex: zIndex,
                marginBottom: 10,
                borderColor: color.Gray,
            }}
            containerStyle={{
                width: '100%',
                zIndex: zIndex,
            }}
            dropDownContainerStyle={{
                width: '100%',
                zIndex: zIndex,
                borderColor: color.Gray,
                backgroundColor: 'white',
            }}
            listMode="SCROLLVIEW"
            dropDownDirection="AUTO"
        />
    );
};

export default DropDown;
