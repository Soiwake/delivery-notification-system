"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Camera, FileImage, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("ファイルサイズは10MB以下にしてください")
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleUpload = () => {
    if (selectedImage) {
      router.push("/processing")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">配達完了通知システム</h1>
          <p className="text-gray-600">伝票の写真をアップロードしてください</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-8">
            {/* Image Preview Area */}
            <div className="mb-6">
              {selectedImage ? (
                <div className="relative w-full h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected receipt"
                    fill
                    className="object-contain"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    変更
                  </Button>
                </div>
              ) : (
                <div
                  className={`w-full h-96 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                    isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                >
                  <FileImage className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">ここに伝票画像をドロップ</p>
                  <p className="text-sm text-gray-500">または下のボタンから選択してください</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button size="lg" className="w-full sm:w-auto">
                  <Upload className="w-5 h-5 mr-2" />
                  画像をアップロード
                </Button>
              </div>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  <Camera className="w-5 h-5 mr-2" />
                  写真を撮る
                </Button>
              </div>
            </div>

            {/* Upload Button */}
            {selectedImage && (
              <div className="mt-6 text-center">
                <Button size="lg" onClick={handleUpload} className="bg-green-600 hover:bg-green-700 text-white px-8">
                  処理を開始
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>対応形式: JPG, PNG, GIF (最大10MB)</p>
        </div>
      </div>
    </div>
  )
}
