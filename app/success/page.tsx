"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, BarChart3 } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
              <div className="w-16 h-1 bg-green-500 mx-auto rounded-full" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">送信完了！</h1>

            <p className="text-lg text-gray-600 mb-2">配達完了通知が正常に送信されました</p>

            <p className="text-sm text-gray-500 mb-8">受取人にメール通知が届きます</p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                ダッシュボードで確認
              </Button>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => router.push("/")} className="w-full sm:w-auto">
                  <Home className="w-5 h-5 mr-2" />
                  新しい伝票を処理
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>通知の既読状況はダッシュボードで確認できます</p>
        </div>
      </div>
    </div>
  )
}
