import type { HttpContext } from '@adonisjs/core/http'

import bindModule from '#decorators/bind_module'
import Module from '#models/module'
import UserDto from '#dtos/user_dto'
import CourseDto from '#dtos/course_dto'
import ModuleDto from '#dtos/module_dto'
import submoduleDto from '#dtos/submodule_dto'

export default class ModulesController {
  @bindModule()
  async show({ inertia, auth }: HttpContext, module: Module) {
    const user = auth.user!

    const course = await module.related('course').query().first()
    const submodules = await module.related('submodulesData').query().orderBy('order', 'asc')

    return inertia.render('modules/show', {
      user: new UserDto(user).toJSON(),
      course: new CourseDto(course!).toJSON(),
      module: new ModuleDto(module).toJSON(),
      submodules: submodules.map((sub) => new submoduleDto(sub).toJSON()),
    })
  }

  async markAsComplete({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const { moduleId } = params

    const module = await user.related('modules').query().where('id', moduleId).first()
    if (!module) return response.notFound({ success: false, message: 'module not found' })

    module.isCompleted = true
    await module.save()

    return response.ok({ success: true, message: 'module has been completed' })
  }
}
