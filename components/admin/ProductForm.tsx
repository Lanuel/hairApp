"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import {
  createProduct,
  updateProduct,
  type ProductFormState,
} from "@/lib/admin/actions";
import {
  HAIR_COLORS,
  HAIR_LENGTHS,
  HAIR_TEXTURES,
  HAIR_TYPES,
  PRODUCT_CATEGORIES,
  slugify,
} from "@/lib/admin/constants";

type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  category: string;
  hairType: string;
  hairTexture: string;
  hairLength: string;
  hairColor: string;
  density: string | null;
  laceType: string | null;
  capSize: string | null;
  featured: boolean;
  inStock: boolean;
  stock: number;
  images: { url: string; publicId: string }[];
};

type ProductFormProps = {
  product?: ProductRecord;
};

const initialState: ProductFormState = {};

export default function ProductForm({ product }: ProductFormProps) {
  const isEditing = Boolean(product);
  const action = isEditing
    ? updateProduct.bind(null, product!.id)
    : createProduct;

  const [state, formAction, pending] = useActionState(action, initialState);
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product?.slug));

  const previewImage = product?.images[0]?.url;

  return (
    <form action={formAction} className="admin-form">
      {state.error ? <p className="admin-alert admin-alert-error">{state.error}</p> : null}

      <div className="admin-form-grid">
        <section className="admin-panel">
          <h2 className="admin-panel-title">Basic details</h2>

          <label className="admin-field">
            <span>Product name</span>
            <input
              name="name"
              required
              value={name}
              onChange={(event) => {
                const nextName = event.target.value;
                setName(nextName);
                if (!slugTouched) setSlug(slugify(nextName));
              }}
              placeholder="Raw Vietnamese Straight"
            />
          </label>

          <label className="admin-field">
            <span>Slug</span>
            <input
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="raw-vietnamese-straight"
            />
          </label>

          <label className="admin-field">
            <span>Description</span>
            <textarea
              name="description"
              required
              rows={5}
              defaultValue={product?.description}
              placeholder="Describe length, lace type, density, and styling notes."
            />
          </label>

          <div className="admin-field-row">
            <label className="admin-field">
              <span>Price (NGN)</span>
              <input
                name="price"
                type="number"
                min="0"
                step="1000"
                required
                defaultValue={product?.price}
              />
            </label>

            <label className="admin-field">
              <span>Discount price</span>
              <input
                name="discountPrice"
                type="number"
                min="0"
                step="1000"
                defaultValue={product?.discountPrice ?? ""}
              />
            </label>
          </div>
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel-title">Hair attributes</h2>

          <div className="admin-field-row">
            <label className="admin-field">
              <span>Category</span>
              <select name="category" defaultValue={product?.category ?? "Wigs"}>
                {PRODUCT_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Hair type</span>
              <select name="hairType" defaultValue={product?.hairType ?? "Virgin Hair"}>
                {HAIR_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="admin-field-row">
            <label className="admin-field">
              <span>Texture</span>
              <select
                name="hairTexture"
                defaultValue={product?.hairTexture ?? "Straight"}
              >
                {HAIR_TEXTURES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Length</span>
              <select name="hairLength" defaultValue={product?.hairLength ?? '24"'}>
                {HAIR_LENGTHS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="admin-field">
            <span>Color</span>
            <select name="hairColor" defaultValue={product?.hairColor ?? "Natural Black"}>
              {HAIR_COLORS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="admin-field-row">
            <label className="admin-field">
              <span>Density</span>
              <input name="density" defaultValue={product?.density ?? ""} placeholder="180%" />
            </label>

            <label className="admin-field">
              <span>Lace type</span>
              <input
                name="laceType"
                defaultValue={product?.laceType ?? ""}
                placeholder="HD Transparent Lace"
              />
            </label>
          </div>

          <label className="admin-field">
            <span>Cap size</span>
            <input name="capSize" defaultValue={product?.capSize ?? ""} placeholder="Medium" />
          </label>
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel-title">Inventory & visibility</h2>

          <label className="admin-field">
            <span>Stock quantity</span>
            <input
              name="stock"
              type="number"
              min="0"
              required
              defaultValue={product?.stock ?? 10}
            />
          </label>

          <div className="admin-checkbox-row">
            <label className="admin-checkbox">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={product?.featured ?? false}
              />
              <span>Featured on homepage</span>
            </label>

            <label className="admin-checkbox">
              <input
                name="inStock"
                type="checkbox"
                defaultChecked={product?.inStock ?? true}
              />
              <span>Available for purchase</span>
            </label>
          </div>

          <label className="admin-field">
            <span>Product image</span>
            <input name="image" type="file" accept="image/*" />
            {previewImage ? (
              <div className="admin-image-preview">
                <Image
                  src={previewImage}
                  alt={product?.name ?? "Product preview"}
                  width={240}
                  height={300}
                  className="admin-image-preview-img"
                />
              </div>
            ) : null}
            {product?.images[0] ? (
              <>
                <input
                  type="hidden"
                  name="imageUrl"
                  defaultValue={product.images[0].url}
                />
                <input
                  type="hidden"
                  name="imagePublicId"
                  defaultValue={product.images[0].publicId}
                />
              </>
            ) : null}
          </label>
        </section>
      </div>

      <div className="admin-form-actions">
        <Link href="/admin/products" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
          {pending ? "Saving..." : isEditing ? "Update product" : "Create product"}
        </button>
      </div>
    </form>
  );
}
