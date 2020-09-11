/**
 * /nedb/ DB Admin ページ認証用ミドルウェア
 */
export default async ({app, route, redirect}) => {
  try {
    // ログイン中か判定: cookie.nedb_admin => Session => saved?
    const admin = await app.$util.loadSession('nedb_admin')
    if (admin.id !== process.env.NEDB_ADMIN_ID) {
      throw new Error('NeDB Admin ID not matched')
    }
    app.$nedb_admin = admin // context.app の $nedb_admin に会員情報保持
    if (route.path.match(/^\/nedb\/login\/?/)) {
      // ログイン中で /nedb/login/ にアクセスした際は /nedb/ にリダイレクト
      redirect('/nedb/')
    }
  } catch(err) {
    // 未ログイン or Error
    console.log(err)
    if (!route.path.match(/^\/nedb\/login\/?/)) {
      // ログインページ以外ならログインページにリダイレクト
      redirect(`/nedb/login/?redirect=${encodeURIComponent(route.path)}`)
    }
  }
}