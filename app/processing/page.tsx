"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Send, Eye, User } from "lucide-react"

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState("reading")
  const [extractedName, setExtractedName] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true)
          setExtractedName("田中 太郎")
          setStage("complete")
          clearInterval(timer)
          return 100
        }
        return prev + 10
      })
    }, 300)

    return () => clearInterval(timer)
  }, [])

  const handleSend = () => {
    router.push("/success")
  }

  const getStageMessage = () => {
    switch (stage) {
      case "reading":
        return "伝票を読み取り中..."
      case "complete":
        return "読み取り完了。送信準備ができました。"
      default:
        return "処理中..."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">伝票処理中</h1>
          <p className="text-gray-600">AI-OCRによる読み取りを行っています</p>
        </div>

        <Card>
          <CardContent className="p-8">
            {/* Progress Section */}
            <div className="text-center mb-8">
              <div className="mb-6">
                {isComplete ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                )}
              </div>

              <Progress value={progress} className="w-full mb-4" />

              <p className="text-lg font-medium text-gray-700 mb-2">{getStageMessage()}</p>

              <p className="text-sm text-gray-500">{progress}% 完了</p>
            </div>

            {/* Extracted Information Preview */}
            {isComplete && extractedName && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Eye className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-green-800">読み取り結果</h3>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-green-700">
                    配達先: <strong>{extractedName}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <Button
                size="lg"
                onClick={handleSend}
                disabled={!isComplete}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <Send className="w-5 h-5 mr-2" />
                配達完了通知を送信
              </Button>

              {!isComplete && <p className="text-sm text-gray-500">読み取り完了まで少々お待ちください</p>}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
