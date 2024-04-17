import { useCallback, useRef } from "react";
import Button from "./Button";
import Input from "./Input";

function GenericForm({
  className,
  onSubmit,
  config = [],
  setFormData,
  formData,
}) {
  const groupId = useRef(0);

  const onChange = useCallback(
    (e) => {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    },
    [setFormData],
  );

  const elementGen = useCallback(
    (formEl, groupId) => {
      if (formEl.input) {
        return (
          <Input
            {...formEl.input}
            key={formEl.input.key}
            id={formEl.input.key}
            onChange={onChange}
            value={formData[formEl.input.key]}
          />
        );
      } else if (formEl.button) {
        return <Button {...formEl.button} key={formEl.button.key} />;
      } else if (formEl.other) {
        const Element = formEl.other.element;
        return <Element key={formEl.other.key} {...formEl.other.props} />;
      } else if (formEl.group) {
        groupId.current++;
        return (
          <div
            className={formEl.group.className}
            key={`form-group-${groupId.current}`}
          >
            {formEl.group.elements.map((groupEl) => elementGen(groupEl))}
          </div>
        );
      }
    },
    [formData, onChange],
  );

  return (
    <form className={className} onSubmit={onSubmit}>
      {config.map((formEl) => elementGen(formEl, groupId))}
    </form>
  );
}

export default GenericForm;
