import logo from './logo.svg';
import './App.css';
import {useForm,useFieldArray,Controller} from 'react-hook-form'

function App() {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute 
    defaultValues:{
      test:[{
        firstName:'nitin',
        inner:[{lastName:'varda'}]
      }]
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "test"
  });
  const { fields:innerFields, append:innerAppend, remove:innerRemove, } = useFieldArray({
    control,
    name: `test[${fields.length-1}].inner`
  });
  console.log(fields[fields.length-1].inner)
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input
              {...register(`test.${index}.firstName`)}
               // make sure to set up defaultValue
            />
            {/* <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
              defaultValue={item.lastName} // make sure to set up defaultValue
            /> */}
            <button type="button" onClick={() => remove(index)}>Delete</button>
            {innerFields.map((innerItem,innerIndex)=>(
              <div key={innerIndex}>
                  <input {...register(`test.${index}.inner.${innerIndex}.lastName`)} defaultValue={innerItem.lastName} />
                  <button type="button" onClick={() => innerRemove(index)}>Delete</button>
                  <button type="button" onClick={() => innerAppend(index)}>Add</button>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "appendBill",inner:[{lastName:''}] })}
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
}

export default App;
