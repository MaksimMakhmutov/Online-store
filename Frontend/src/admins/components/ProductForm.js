import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "../../common";
import { createProduct, updateProduct, getCategories } from "../../actions";
import { useEffect, useState } from "react";

const schema = yup.object({
  name: yup.string().required(),
  price: yup.number().typeError("Price must be a number").positive().required(),
  image: yup.string().url().optional(),
  description: yup.string().optional(),
  categoryId: yup.string().required("Category required"),
});

export const ProductForm = ({ initial, onSaved, onDone }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: initial || {} });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((r) => setCategories(r.categories || []));
  }, []);

  useEffect(() => {
    reset(initial || {});
  }, [initial, reset]);

  const onSubmit = async (data) => {
    if (initial?._id) await updateProduct(initial._id, data);
    else await createProduct(data);

    reset({}, { keepDefaultValues: false }); // очищаем форму
    onSaved && onSaved();
    onDone && onDone(); // сброс режима редактирования
  };

  const onCancel = () => {
    reset({}, { keepDefaultValues: false }); // очищаем все поля
    onDone && onDone(); // сброс режима редактирования
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <label>Name</label>
        <Input {...register("name")} />
        {errors.name?.message}
      </Row>
      <Row>
        <label>Price</label>
        <Input {...register("price")} />
        {errors.price?.message}
      </Row>
      <Row>
        <label>Image URL</label>
        <Input {...register("image")} />
        {errors.image?.message}
      </Row>
      <Row>
        <label>Description</label>
        <Input {...register("description")} />
      </Row>
      <Row>
        <label>Category</label>
        <select {...register("categoryId")}>
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId?.message}
      </Row>
      <Buttons>
        <Button type="submit">{initial?._id ? "Save" : "Create"}</Button>
        {initial?._id && (
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Buttons>
    </form>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
