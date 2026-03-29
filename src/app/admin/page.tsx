'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Package, Flame, Sparkles } from 'lucide-react'
import { BRANDS, CATEGORIES } from '@/lib/constants'
import { createProduct, updateProduct } from '@/lib/actions'

interface Product {
  id: string
  name: string
  slug: string
  brand: string
  category: string
  priceRetail: number
  priceWholesale: number
  image: string | null
  sizes: string[]
  isNew: boolean
  isHot: boolean
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    brand: BRANDS[0] as string,
    category: CATEGORIES[0] as string,
    image: '',
    isNew: false,
    isHot: false,
  })

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products?all=true')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const totalProducts = products.filter((p) => p.isActive).length
  const newProducts = products.filter((p) => p.isNew && p.isActive).length
  const hotProducts = products.filter((p) => p.isHot && p.isActive).length

  const handleToggle = async (
    id: string,
    field: 'isNew' | 'isHot' | 'isActive',
    currentValue: boolean
  ) => {
    await updateProduct(id, { [field]: !currentValue })
    await fetchProducts()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    await createProduct({
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      image: formData.image || undefined,
      isNew: formData.isNew,
      isHot: formData.isHot,
    })

    setFormData({
      name: '',
      brand: BRANDS[0] as string,
      category: CATEGORIES[0] as string,
      image: '',
      isNew: false,
      isHot: false,
    })
    setShowForm(false)
    await fetchProducts()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-[#1A1A1A] p-6 border border-white/5">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-gold" />
            <span className="text-sm text-gray-400">Total Productos</span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white">
            {totalProducts}
          </p>
        </div>
        <div className="rounded-xl bg-[#1A1A1A] p-6 border border-white/5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-gold" />
            <span className="text-sm text-gray-400">Nuevos</span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white">
            {newProducts}
          </p>
        </div>
        <div className="rounded-xl bg-[#1A1A1A] p-6 border border-white/5">
          <div className="flex items-center gap-3">
            <Flame className="h-5 w-5 text-[#EF4444]" />
            <span className="text-sm text-gray-400">Hot</span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white">
            {hotProducts}
          </p>
        </div>
      </div>

      {/* Add product button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl tracking-wider text-white">
          PRODUCTOS
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-gold-dark cursor-pointer"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancelar' : 'Agregar Producto'}
        </button>
      </div>

      {/* Add product form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            className="mb-8 rounded-xl bg-[#1A1A1A] p-6 border border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                  placeholder="Nike Air Max 90"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Marca</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2 text-white focus:border-gold focus:outline-none"
                >
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2 text-white focus:border-gold focus:outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  URL de imagen (opcional)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full rounded-lg bg-[#0A0A0A] border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:border-gold focus:outline-none"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) =>
                    setFormData({ ...formData, isNew: e.target.checked })
                  }
                  className="accent-gold"
                />
                Nuevo
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isHot}
                  onChange={(e) =>
                    setFormData({ ...formData, isHot: e.target.checked })
                  }
                  className="accent-gold"
                />
                Hot
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="rounded-lg bg-gold px-6 py-2 font-bold text-black transition-colors hover:bg-gold-dark cursor-pointer"
              >
                Crear Producto
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Product table */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">Cargando productos...</div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center text-gray-400">No hay productos aún</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-[#1A1A1A]">
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  Marca
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  Categoría
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">
                  New
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">
                  Hot
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">
                  Activo
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-white font-medium">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{product.brand}</td>
                  <td className="px-4 py-3 text-gray-400">{product.category}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(product.id, 'isNew', product.isNew)}
                      className={`inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                        product.isNew ? 'bg-gold' : 'bg-gray-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                          product.isNew ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(product.id, 'isHot', product.isHot)}
                      className={`inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                        product.isHot ? 'bg-[#EF4444]' : 'bg-gray-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                          product.isHot ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        handleToggle(product.id, 'isActive', product.isActive)
                      }
                      className={`inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer ${
                        product.isActive ? 'bg-whatsapp' : 'bg-gray-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                          product.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
